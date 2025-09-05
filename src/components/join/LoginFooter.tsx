import Link from "next/link";

export default function LoginFooter() {
  return (
    <div className="text-12-500 text-text-tertiary flex w-full flex-row items-center justify-center">
      <Link
        className="hover:underline"
        href="https://quasar-guava-e9f.notion.site/1f5144e6653280379023dacb5593b2dd?pvs=74"
        target="_blank"
        rel="noopener noreferrer"
      >
        개인정보 처리 방침
      </Link>
      <div className="mx-1">|</div>
      <Link
        className="hover:underline"
        href="https://quasar-guava-e9f.notion.site/1f5144e6653280fe9217f4a46a343de0"
        target="_blank"
        rel="noopener noreferrer"
      >
        이용 약관
      </Link>
    </div>
  );
}
