import { DateTime } from "luxon";

export default class AppointmentModel {
  constructor({
    id = null,
    status = "pending",
    reasonForVisit,
    date,
    time,
    datetime,
  }) {
    if (!(datetime || (date && time))) {
      throw TypeError("`date` & `time` or `datetime` must be provided");
    }

    if (!reasonForVisit) {
      throw TypeError("`reasonForVisit` is required");
    }

    this.id = id;
    this.status = status;
    this.reasonForVisit = reasonForVisit;
    if (date && time) {
      this._datetime = DateTime.fromFormat(date + time, "yyyy-MM-ddHH:mm");
    } else {
      // it's `datetime` then
      this._datetime = DateTime.fromISO(datetime);
    }

    this.destructDateTime();
  }

  static fromSnapshot(snapshot) {
    return Object.keys(snapshot).map((key) => {
      const val = snapshot[key];
      const newAppointment = new AppointmentModel({
        id: key,
        status: val.status,
        reasonForVisit: val.reasonForVisit,
        datetime: val.datetime,
      });
      return newAppointment;
    });
  }

  destructDateTime() {
    this.dayOfMonth = this._datetime.toFormat("d MMM");
    this.dayOfWeek = this._datetime.toFormat("EEEE");
    this.time = this._datetime.toFormat("hh:mm a");
    this.relativeDate = this._datetime.toRelativeCalendar();
  }

  isMissed() {
    return this._datetime.diffNow() < 0;
  }

  toObject() {
    return {
      id: this.id,
      status: this.status,
      reasonForVisit: this.reasonForVisit,
      datetime: this._datetime.toISO(),
    };
  }
}
