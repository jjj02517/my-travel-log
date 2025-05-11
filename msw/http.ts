import { http } from "msw";

// MSW HTTP 클라이언트 설정
export const httpClient = {
  get: async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  delete: async (url: string) => {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // DELETE 요청은 응답 본문이 없으므로 json() 호출하지 않음
    return;
  },
};
