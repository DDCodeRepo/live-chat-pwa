export interface WhatsNew {
    status: number;
    newEvents: Event[];
    email: string;
    name: string;
  
    [key: string]: any;
}

export interface Event {
    id: string,
    type: string,
    date: string
}
  