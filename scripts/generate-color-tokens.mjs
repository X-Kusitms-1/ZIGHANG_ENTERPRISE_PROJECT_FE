import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

function toKebabCase(input) {
  return String(input)
    .replaceAll(/[^a-zA-Z0-9]+/g, "-")
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replaceAll(/-{2,}/g, "-")
    .replaceAll(/^-|-$/g, "");
}

function isColorToken(node) {
  return (
    node &&
    typeof node === "object" &&
    "value" in node &&
    "type" in node &&
    node.type === "color"
  );
}

function isTypedToken(node) {
  return node && typeof node === "object" && "value" in node && "type" in node;
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function flattenColorTokens(
  root,
  pathParts = [],
  out = [],
  pathToVarMap = new Map(),
  refPrefixSegments = [],
  refParts = []
) {
  if (!root || typeof root !== "object") return { tokens: out, pathToVarMap };

  if (isColorToken(root)) {
    const variableName = `--${toKebabCase(pathParts.join("-"))}`;
    out.push({ name: variableName, value: root.value });
    // Save mapping from dotted path (e.g. Color.Blue.500) to variable name (e.g. --color-blue-500)
    const dottedKey = pathParts.join(".");
    pathToVarMap.set(dottedKey, variableName);
    return { tokens: out, pathToVarMap };
  }

  for (const [key, value] of Object.entries(root)) {
    const nextPath = [...pathParts, toKebabCase(key)];
    // Track JSON reference path using original keys only (no kebab-case)
    const nextRefParts = [...refParts, key];
    if (isColorToken(value)) {
      const varName = `--${toKebabCase(nextPath.join("-"))}`;
      out.push({ name: varName, value: value.value });
      const refKey = [...refPrefixSegments, ...nextRefParts].join(".");
      const canonicalRefKey = refKey
        .split(".")
        .map((part) => part.replaceAll(" ", ""))
        .join(".");
      pathToVarMap.set(refKey, varName);
      pathToVarMap.set(canonicalRefKey, varName);
    } else if (value && typeof value === "object") {
      flattenColorTokens(
        value,
        nextPath,
        out,
        pathToVarMap,
        refPrefixSegments,
        nextRefParts
      );
    }
  }
  return { tokens: out, pathToVarMap };
}

function flattenSemanticTokens(root, pathParts = [], out = []) {
  if (!root || typeof root !== "object") return out;
  if (isTypedToken(root)) {
    out.push({ path: pathParts, value: root.value, type: root.type });
    return out;
  }
  for (const [key, value] of Object.entries(root)) {
    flattenSemanticTokens(value, [...pathParts, toKebabCase(key)], out);
  }
  return out;
}

function resolveReferenceValue(value, pathToVarMap) {
  if (typeof value !== "string") return null;
  const match = value.match(/^\{([^}]+)\}$/);
  if (!match) return null;
  let ref = match[1]; // e.g., Color.Blue.500
  // Try direct key first
  if (pathToVarMap.has(ref)) return `var(${pathToVarMap.get(ref)})`;
  // Try normalized key (remove spaces and normalize case of first segment)
  const parts = ref.split(".");
  if (parts.length > 0) parts[0] = parts[0].trim();
  const canonical = parts.map((p) => p.replaceAll(" ", "")).join(".");
  if (pathToVarMap.has(canonical)) return `var(${pathToVarMap.get(canonical)})`;
  // Last attempt: lower-cased, kebab combined map
  const lower = parts.map((p) => p.toLowerCase()).join(".");
  if (pathToVarMap.has(lower)) return `var(${pathToVarMap.get(lower)})`;
  return null;
}

// Map common weight names to numeric values
const FONT_WEIGHT_MAP = {
  thin: 100,
  extralight: 200,
  ultralight: 200,
  light: 300,
  normal: 400,
  regular: 400,
  book: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  extrabold: 800,
  ultrabold: 800,
  black: 900,
};

function toPx(value) {
  if (typeof value === "number") return `${value}px`;
  if (typeof value === "string")
    return /px$/.test(value) ? value : `${value}px`;
  return String(value);
}

function collectTextPrimitives(primitiveRoot) {
  const textRoot = {};
  if (!isPlainObject(primitiveRoot)) return textRoot;
  for (const [groupKey, groupVal] of Object.entries(primitiveRoot)) {
    if (groupKey.toLowerCase() === "color") continue;
    if (!isPlainObject(groupVal)) continue;
    const groupName = toKebabCase(groupKey); // heading, body, title, caption
    const groupOut = (textRoot[groupName] = {});

    // font family
    if (isPlainObject(groupVal["font family"])) {
      const famVal = groupVal["font family"].value;
      if (famVal) groupOut.fontFamily = famVal;
    }

    // font weights
    if (isPlainObject(groupVal["font weight"])) {
      const weights = {};
      for (const [wKey, wVal] of Object.entries(groupVal["font weight"])) {
        if (!isPlainObject(wVal)) continue;
        const raw = String(wVal.value || "").toLowerCase();
        const mapped = FONT_WEIGHT_MAP[raw] ?? raw;
        weights[toKebabCase(wKey)] = mapped;
      }
      if (Object.keys(weights).length) groupOut.fontWeight = weights;
    }

    // sizes (e.g., 3xl, 2xl, xl, lg, md, sm, read)
    for (const [sizeKey, sizeObj] of Object.entries(groupVal)) {
      if (["font family", "font weight"].includes(sizeKey)) continue;
      if (!isPlainObject(sizeObj)) continue;
      const fontSize = isPlainObject(sizeObj["font size"])
        ? sizeObj["font size"].value
        : undefined;
      const lineHeight = isPlainObject(sizeObj["line height"])
        ? sizeObj["line height"].value
        : undefined;
      const letterSpacing = isPlainObject(sizeObj["letter spacing"])
        ? sizeObj["letter spacing"].value
        : undefined;
      if (fontSize == null && lineHeight == null && letterSpacing == null)
        continue;
      const sizeName = toKebabCase(sizeKey);
      groupOut[sizeName] = {};
      if (fontSize != null) groupOut[sizeName].fontSize = toPx(fontSize);
      if (lineHeight != null) groupOut[sizeName].lineHeight = toPx(lineHeight);
      if (letterSpacing != null)
        groupOut[sizeName].letterSpacing = toPx(letterSpacing);
    }
  }
  return textRoot;
}

function buildTextRootCss(textRoot) {
  const lines = [];
  for (const [groupName, groupVal] of Object.entries(textRoot)) {
    if (groupVal.fontFamily) {
      lines.push(`  --text-${groupName}-font-family: ${groupVal.fontFamily};`);
    }
    if (groupVal.fontWeight) {
      for (const [wKey, wVal] of Object.entries(groupVal.fontWeight)) {
        lines.push(`  --text-${groupName}-font-weight-${wKey}: ${wVal};`);
      }
    }
    for (const [sizeName, sizeObj] of Object.entries(groupVal)) {
      if (sizeName === "fontFamily" || sizeName === "fontWeight") continue;
      if (sizeObj.fontSize)
        lines.push(
          `  --text-${groupName}-${sizeName}-font-size: ${sizeObj.fontSize};`
        );
      if (sizeObj.lineHeight)
        lines.push(
          `  --text-${groupName}-${sizeName}-line-height: ${sizeObj.lineHeight};`
        );
      if (sizeObj.letterSpacing)
        lines.push(
          `  --text-${groupName}-${sizeName}-letter-spacing: ${sizeObj.letterSpacing};`
        );
    }
  }
  return lines;
}

function buildTextThemeCss(textRoot) {
  const lines = [];
  for (const [groupName, groupVal] of Object.entries(textRoot)) {
    if (groupVal.fontFamily) {
      lines.push(
        `  --font-${groupName}: var(--text-${groupName}-font-family);`
      );
    }
    for (const [sizeName, sizeObj] of Object.entries(groupVal)) {
      if (sizeName === "fontFamily" || sizeName === "fontWeight") continue;
      if (sizeObj.fontSize)
        lines.push(
          `  --text-${groupName}-${sizeName}: var(--text-${groupName}-${sizeName}-font-size);`
        );
      if (sizeObj.lineHeight)
        lines.push(
          `  --leading-${groupName}-${sizeName}: var(--text-${groupName}-${sizeName}-line-height);`
        );
      if (sizeObj.letterSpacing)
        lines.push(
          `  --tracking-${groupName}-${sizeName}: var(--text-${groupName}-${sizeName}-letter-spacing);`
        );
    }
  }
  return lines;
}

function buildTypographyUtilitiesCss(textRoot) {
  const lines = [];
  const start = "/* generated-typography-utilities:start */";
  const end = "/* generated-typography-utilities:end */";
  lines.push(start);
  for (const [groupName, groupVal] of Object.entries(textRoot)) {
    const hasFamily = Boolean(groupVal.fontFamily);
    const weights = groupVal.fontWeight || {};
    for (const [sizeName, sizeObj] of Object.entries(groupVal)) {
      if (sizeName === "fontFamily" || sizeName === "fontWeight") continue;
      const classBase = `${groupName}-${sizeName}`; // e.g., body-2xl
      const props = [];
      if (sizeObj.fontSize)
        props.push(`  font-size: var(--text-${groupName}-${sizeName});`);
      if (sizeObj.lineHeight)
        props.push(`  line-height: var(--leading-${groupName}-${sizeName});`);
      if (hasFamily)
        props.push(`  font-family: var(--text-${groupName}-font-family);`);
      // base utility without explicit weight
      lines.push(`@utility ${classBase} {`);
      lines.push(...props);
      lines.push(`}`);
      // utilities per weight
      for (const [weightName] of Object.entries(weights)) {
        const className = `${classBase}-${weightName}`; // e.g., body-2xl-semibold
        lines.push(`@utility ${className} {`);
        lines.push(...props);
        lines.push(
          `  font-weight: var(--text-${groupName}-font-weight-${weightName});`
        );
        lines.push(`}`);
      }
    }
  }
  lines.push(end);
  return lines;
}

async function main() {
  const projectRoot = process.cwd();
  const inputPath = resolve(projectRoot, "src/app/token.json");
  const globalsPath = resolve(projectRoot, "src/app/globals.css");

  const raw = await readFile(inputPath, "utf8");
  const tokens = JSON.parse(raw);

  const primitiveMode = tokens["primitive/Mode 1"] || {};
  const primitive = primitiveMode?.Color;
  if (!primitive) {
    console.error(
      'No primitive color tokens found at "primitive/Mode 1" → "Color"'
    );
  }

  const { tokens: colorVars, pathToVarMap } = flattenColorTokens(
    primitive,
    ["color"],
    [],
    new Map(),
    ["Color"],
    []
  );

  const semanticRoot = tokens["semantic/Mode 1"];
  const semanticTokens = semanticRoot
    ? flattenSemanticTokens(semanticRoot)
    : [];

  // Collect text primitives from primitive/Mode 1 (excluding Color)
  const textPrimitives = collectTextPrimitives(primitiveMode);

  // Read globals.css to inject tokens
  let globalsCss = await readFile(globalsPath, "utf8");

  // Remove any tokens.css import if exists
  globalsCss = globalsCss.replace(
    /\n?@import\s+["']\.\.\/styles\/tokens\.css["'];?\n?/g,
    "\n"
  );

  // Helper to find block range by selector start index
  function findBlockRange(source, startIndexOfBrace) {
    let depth = 0;
    for (let i = startIndexOfBrace; i < source.length; i++) {
      const ch = source[i];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          return { start: startIndexOfBrace, end: i };
        }
      }
    }
    return null;
  }

  // Locate top-level :root block (first occurrence)
  const rootSelRegex = /:root\s*\{/g;
  const rootSelMatch = rootSelRegex.exec(globalsCss);
  if (!rootSelMatch) {
    throw new Error("Could not find :root block in src/app/globals.css");
  }
  const rootBlock = findBlockRange(
    globalsCss,
    rootSelMatch.index + rootSelMatch[0].length - 1
  );
  if (!rootBlock) throw new Error("Failed to parse :root block");

  // Prepare primitive color tokens content
  const primitiveStart = "/* generated-color-tokens:start */";
  const primitiveEnd = "/* generated-color-tokens:end */";
  const primitiveLines = [primitiveStart];
  for (const { name, value } of colorVars) {
    primitiveLines.push(`  ${name}: ${value};`);
  }
  primitiveLines.push(primitiveEnd);
  const primitiveBlock = "\n" + primitiveLines.join("\n") + "\n";

  // Prepare primitive text tokens content
  const textStart = "/* generated-text-tokens:start */";
  const textEnd = "/* generated-text-tokens:end */";
  const textLines = [textStart, ...buildTextRootCss(textPrimitives), textEnd];
  const textBlock = "\n" + textLines.join("\n") + "\n";

  // Replace or insert into :root block
  const rootContent = globalsCss.slice(rootBlock.start + 1, rootBlock.end);
  const existingPrimitiveRe = new RegExp(
    primitiveStart.replace(/[/*]/g, (m) => `\\${m}`) +
      "[\\s\\S]*?" +
      primitiveEnd.replace(/[/*]/g, (m) => `\\${m}`),
    "m"
  );
  let newRootContent;
  if (existingPrimitiveRe.test(rootContent)) {
    newRootContent = rootContent.replace(
      existingPrimitiveRe,
      primitiveBlock.trim()
    );
  } else {
    newRootContent = rootContent.replace(/\n\s*\}$/, "") + primitiveBlock + "}";
    // The '}' will be re-added when we reconstruct full content below; ensure no duplicate
    newRootContent = newRootContent.replace(/\}\s*$/, "");
  }

  // Reconstruct globals with updated :root
  globalsCss =
    globalsCss.slice(0, rootBlock.start + 1) +
    newRootContent +
    globalsCss.slice(rootBlock.end);

  // Inject or replace text tokens in :root
  const rootSelMatch2 = /:root\s*\{/g.exec(globalsCss);
  if (!rootSelMatch2) throw new Error(":root disappeared unexpectedly");
  const rootBlock2 = findBlockRange(
    globalsCss,
    rootSelMatch2.index + rootSelMatch2[0].length - 1
  );
  const rootContent2 = globalsCss.slice(rootBlock2.start + 1, rootBlock2.end);
  const existingTextRe = new RegExp(
    textStart.replace(/[/*]/g, (m) => `\\${m}`) +
      "[\\s\\S]*?" +
      textEnd.replace(/[/*]/g, (m) => `\\${m}`),
    "m"
  );
  let newRootContent2;
  if (existingTextRe.test(rootContent2)) {
    newRootContent2 = rootContent2.replace(existingTextRe, textBlock.trim());
  } else {
    newRootContent2 = rootContent2.replace(/\n\s*\}$/, "") + textBlock + "}";
    newRootContent2 = newRootContent2.replace(/\}\s*$/, "");
  }
  globalsCss =
    globalsCss.slice(0, rootBlock2.start + 1) +
    newRootContent2 +
    globalsCss.slice(rootBlock2.end);

  // Locate @theme inline block
  const themeRegex = /@theme\s+inline\s*\{/g;
  const themeMatch = themeRegex.exec(globalsCss);
  if (!themeMatch) {
    throw new Error(
      'Could not find "@theme inline {" block in src/app/globals.css'
    );
  }
  const themeBlock = findBlockRange(
    globalsCss,
    themeMatch.index + themeMatch[0].length - 1
  );
  if (!themeBlock) throw new Error("Failed to parse @theme inline block");

  // Prepare semantic tokens (without 'semantic' prefix) to go into @theme inline
  const semanticStart = "/* generated-semantic-tokens:start */";
  const semanticEnd = "/* generated-semantic-tokens:end */";
  const semanticLines = [semanticStart];
  for (const { path, value, type } of semanticTokens) {
    if (type !== "color") continue;
    const varName = `--${toKebabCase(path.join("-"))}`; // e.g., --color-bg-interactive-primary
    const refValue = resolveReferenceValue(value, pathToVarMap);
    const finalValue = refValue ?? value;
    semanticLines.push(`  ${varName}: ${finalValue};`);
  }
  semanticLines.push(semanticEnd);
  const semanticBlock = "\n" + semanticLines.join("\n") + "\n";

  // Prepare typography theme tokens
  const typoStart = "/* generated-typography-tokens:start */";
  const typoEnd = "/* generated-typography-tokens:end */";
  const typoLines = [typoStart, ...buildTextThemeCss(textPrimitives), typoEnd];
  const typoBlock = "\n" + typoLines.join("\n") + "\n";

  const themeContent = globalsCss.slice(themeBlock.start + 1, themeBlock.end);
  const existingSemanticRe = new RegExp(
    semanticStart.replace(/[/*]/g, (m) => `\\${m}`) +
      "[\\s\\S]*?" +
      semanticEnd.replace(/[/*]/g, (m) => `\\${m}`),
    "m"
  );
  let newThemeContent;
  if (existingSemanticRe.test(themeContent)) {
    newThemeContent = themeContent.replace(
      existingSemanticRe,
      semanticBlock.trim()
    );
  } else {
    newThemeContent =
      themeContent.replace(/\n\s*\}$/, "") + semanticBlock + "}";
    newThemeContent = newThemeContent.replace(/\}\s*$/, "");
  }

  globalsCss =
    globalsCss.slice(0, themeBlock.start + 1) +
    newThemeContent +
    globalsCss.slice(themeBlock.end);

  // Inject or replace typography theme tokens
  const themeMatch2 = /@theme\s+inline\s*\{/g.exec(globalsCss);
  if (!themeMatch2) throw new Error("@theme inline disappeared unexpectedly");
  const themeBlock2 = findBlockRange(
    globalsCss,
    themeMatch2.index + themeMatch2[0].length - 1
  );
  const themeContent2 = globalsCss.slice(
    themeBlock2.start + 1,
    themeBlock2.end
  );
  const existingTypoRe = new RegExp(
    typoStart.replace(/[/*]/g, (m) => `\\${m}`) +
      "[\\s\\S]*?" +
      typoEnd.replace(/[/*]/g, (m) => `\\${m}`),
    "m"
  );
  let newThemeContent2;
  if (existingTypoRe.test(themeContent2)) {
    newThemeContent2 = themeContent2.replace(existingTypoRe, typoBlock.trim());
  } else {
    newThemeContent2 = themeContent2.replace(/\n\s*\}$/, "") + typoBlock + "}";
    newThemeContent2 = newThemeContent2.replace(/\}\s*$/, "");
  }

  globalsCss =
    globalsCss.slice(0, themeBlock2.start + 1) +
    newThemeContent2 +
    globalsCss.slice(themeBlock2.end);

  // Inject or replace typography utilities at file root
  const utilStart = "/* generated-typography-utilities:start */";
  const utilEnd = "/* generated-typography-utilities:end */";
  const utilLines = buildTypographyUtilitiesCss(textPrimitives);
  const utilBlock = utilLines.join("\n") + "\n";
  const utilRe = new RegExp(
    utilStart.replace(/[/*]/g, (m) => `\\${m}`) +
      "[\\s\\S]*?" +
      utilEnd.replace(/[/*]/g, (m) => `\\${m}`),
    "m"
  );
  if (utilRe.test(globalsCss)) {
    globalsCss = globalsCss.replace(utilRe, utilBlock.trim());
  } else {
    // Append at end of file with a preceding newline
    globalsCss = globalsCss.replace(/\s*$/, "\n" + utilBlock);
  }

  await writeFile(globalsPath, globalsCss, "utf8");
  console.log(`Updated ${globalsPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
