import { WhatsNew, Event } from "src/types/whatsnew";

enum eventMap {
  "message",
  "request",
  "notification",
  "broadcast",
};

export function pollingRouter(resData: WhatsNew) {
  const eventArr: Event[] = resData.newEvents;
  eventArr.map((item: Event) => handleEvent(item));
}

function handleEvent(eventItem: Event): void {
  const eventType = eventItem.type;

  switch (eventMap[eventType+1]) {
    case "message":
      // code block
      break;
    case "request":
      // code block
      break;
    case "notification":
      // code block
      break;
    case "broadcast":
      // code block
      break;
    default:
    // code block
  }
}
