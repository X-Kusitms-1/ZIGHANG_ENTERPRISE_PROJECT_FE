"use client";
import { useState } from "react";
import Image from "next/image";
import CustomScrollbar from "@/components/ui/CustomScrollbar";
import { LOCATION_DATA } from "@/constants/LocationData";

type LocationItem = {
  city: string;
  district: string;
};

interface LocationGridProps {
  locationList: LocationItem[];
  setLocationList: React.Dispatch<React.SetStateAction<LocationItem[]>>;
}

export default function LocationGrid(props: LocationGridProps) {
  const { locationList, setLocationList } = props;

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  // 도시별 선택된 지역구를 저장하는 객체
  const [selectedDistricts, setSelectedDistricts] = useState<{
    [city: string]: Set<string>;
  }>(
    locationList.length > 0
      ? locationList.reduce(
          (acc, item) => {
            if (!acc[item.city]) acc[item.city] = new Set();
            acc[item.city].add(item.district);
            return acc;
          },
          {} as { [city: string]: Set<string> }
        )
      : {}
  );

  const handleCityClick = (cityName: string) => {
    setSelectedCity(cityName);
  };

  const handleDistrictClick = (districtName: string) => {
    if (!selectedCity) return;
    const prev = selectedDistricts[selectedCity] || new Set<string>();
    const newSet = new Set<string>();

    if (districtName === "전체") {
      // "전체" 클릭 시
      if (prev.has("전체")) {
        // 이미 "전체"가 선택되어 있으면 해제
      } else {
        // "전체" 선택 시 다른 모든 지역구 해제하고 "전체"만 선택
        newSet.add("전체");
      }
    } else {
      // 개별 지역구 클릭 시
      if (prev.has(districtName)) {
        // 이미 선택된 지역구면 해제
        prev.forEach((district) => {
          if (district !== districtName) newSet.add(district);
        });
      } else {
        // 새로운 지역구 선택 시 "전체" 해제하고 기존 개별 지역구들과 함께 선택
        prev.forEach((district) => {
          if (district !== "전체") newSet.add(district);
        });
        newSet.add(districtName);
      }
    }

    const newSelectedDistricts = {
      ...selectedDistricts,
      [selectedCity]: newSet,
    };
    setSelectedDistricts(newSelectedDistricts);

    // 모든 지역의 선택값을 locationList에 반영
    const allSelected = Object.entries(newSelectedDistricts).flatMap(
      ([city, districts]) =>
        Array.from(districts).map((district) => ({ city, district }))
    );
    setLocationList(allSelected);
  };

  // const handleUndecidedChange = () => {
  //   const newUndecided = !isUndecided;
  //   setIsUndecided(newUndecided);
  //   if (newUndecided) {
  //     setSelectedDistricts({});
  //     setLocationList([]);
  //     setSelectedCity(null);
  //     console.log("🚫 모든 지역/지역구 선택 초기화됨");
  //   }
  // };

  const selectedCityData = LOCATION_DATA.find(
    (city) => city.city === selectedCity
  );

  return (
    <div className="mobile:w-full flex flex-col gap-3 pt-6">
      {/* 전체 레이아웃 컨테이너 */}
      <div className="border-t-border-line border-b-border-line flex border-t border-b">
        {/* 지역 영역 */}
        <div className="pc:w-[200px] tablet:w-[42%] mobile:w-[42%] pc:h-[380px] mobile:h-[60.78dvh] tablet:h-[67.53dvh] flex p-2">
          <div className="pc:w-[172px] tablet:w-full mobile:w-full flex flex-col gap-2">
            <CustomScrollbar variant="location">
              <div className="flex w-full flex-col gap-2">
                {LOCATION_DATA.map((city) => {
                  const selectedSet = selectedDistricts[city.city] || new Set();
                  const isWholeSelected = selectedSet.has("전체");

                  // "전체"가 선택된 경우 해당 지역의 전체 지역구 개수 (전체 제외)
                  // "전체"가 선택되지 않은 경우 선택된 개별 지역구 개수
                  const selectedCount = isWholeSelected
                    ? city.districts.filter((district) => district !== "전체")
                        .length
                    : Array.from(selectedSet).filter(
                        (district) => district !== "전체"
                      ).length;

                  const isSelectedCity = selectedCity === city.city;
                  const hasSelectedDistricts = selectedCount > 0;

                  return (
                    <button
                      key={city.city}
                      onClick={() => handleCityClick(city.city)}
                      className={`flex h-[40px] items-center justify-between rounded-lg py-2 pr-4 pl-5 text-left transition-colors ${
                        isSelectedCity
                          ? "bg-bg-info text-text-info text-16-600"
                          : hasSelectedDistricts
                            ? "text-text-primary text-16-600 hover:bg-bg-base-hovered"
                            : "text-text-tertiary text-16-500 hover:bg-bg-base-hovered"
                      }`}
                    >
                      <span>{city.city}</span>
                      {hasSelectedDistricts && (
                        <span className="text-16-500 text-text-info">
                          {selectedCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </CustomScrollbar>
          </div>
        </div>

        {/* 지역구 영역 */}
        <div className="border-l-border-line pc:flex-1 tablet:w-[58%] mobile:w-[58%] pc:h-[380px] mobile:h-[58.78dvh] tablet:h-[65.53dvh] flex border-l p-2">
          <div className="tablet:w-full mobile:w-full flex flex-col gap-2">
            <CustomScrollbar variant="location">
              <div className="flex w-full flex-col gap-2">
                {selectedCityData && (
                  <>
                    {selectedCityData.districts.map((district: string) => {
                      const isSelected =
                        selectedCity !== null &&
                        selectedDistricts[selectedCity]?.has(district);
                      return (
                        <button
                          key={district}
                          onClick={() => handleDistrictClick(district)}
                          className={`flex h-10 items-center gap-2 rounded-lg py-2 pr-4 pl-5 text-left transition-colors ${
                            isSelected
                              ? "bg-bg-info text-text-info text-16-600"
                              : "text-text-tertiary hover:bg-bg-base-hovered text-16-500"
                          } `}
                        >
                          <span>{district}</span>
                          {isSelected && (
                            <Image
                              src="/onboarding/check.svg"
                              alt="체크"
                              width={20}
                              height={20}
                            />
                          )}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </CustomScrollbar>
          </div>
        </div>
      </div>

      {/* 미정(아직 선택하지 않음) 옵션 영역 - shadcn Checkbox 사용
      <div className="flex items-center gap-1 py-2">
        <Checkbox
          checked={isUndecided}
          onCheckedChange={handleUndecidedChange}
          className="border-border-inverse h-[16px] w-[16px] rounded-[4px] border"
          id="location-undecided-checkbox"
          bgColor="primary"
        />
        <label
          htmlFor="location-undecided-checkbox"
          className={`text-14 cursor-pointer ${
            isUndecided
              ? "text-text-primary text-14-600"
              : "text-text-tertiary text-14-500"
          }`}
        >
          지역을 아직 정하지 못했어요.
        </label>
      </div> */}
    </div>
  );
}
