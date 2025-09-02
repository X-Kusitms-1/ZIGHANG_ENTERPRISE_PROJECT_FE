export default function LocationStep() {
  return (
    <div className="flex w-full flex-col items-center">
      <h3 className="mb-6 text-lg">희망 근무지역을 선택해주세요</h3>
      <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
        <button className="rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
          서울
        </button>
        <button className="rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
          경기
        </button>
        <button className="rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
          인천
        </button>
        <button className="rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
          부산
        </button>
        <button className="rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
          대구
        </button>
        <button className="rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
          대전
        </button>
        <button className="rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
          광주
        </button>
        <button className="rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
          울산
        </button>
        <button className="rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
          기타
        </button>
      </div>
    </div>
  );
}
