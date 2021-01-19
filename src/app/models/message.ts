export class Message {
    constructor(
        public _id: string,
        public emmiter: string,
        public receiver: string,
        public viewed: boolean,
        public created_at: string,
        public text: string
    ) { }
}