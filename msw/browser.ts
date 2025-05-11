// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// MSW worker 설정
export const worker = setupWorker(...handlers);

// 프로덕션 환경에서 MSW가 작동하는지 확인
if (typeof window !== "undefined") {
  // 브라우저 환경에서만 실행
  worker
    .start({
      onUnhandledRequest: "bypass", // 처리되지 않은 요청은 무시
    })
    .catch((error: Error) => {
      console.error("MSW failed to start:", error);
    });
}
