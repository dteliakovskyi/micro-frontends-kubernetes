import { Subjects } from "../config";

export type Event = {
  subject: Subjects;
  data: unknown;
};
