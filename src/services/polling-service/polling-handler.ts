import useInterval from "src/hooks/useInterval";
import { HttpService } from "../http-service/http-service";
import { pollingRouter } from "./polling-data-router";

function usePollingHandler(dataAPI: string, delayTime: number | null) {
  const httpObj = HttpService.getInstance();

  useInterval(() => {
    /* httpObj
      .get(dataAPI)
      .then((response) => response.data)
      //.then((resData) => pollingRouter(resData)); */
  }, delayTime);
}

export default usePollingHandler;
