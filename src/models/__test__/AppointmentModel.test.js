import { DateTime } from "luxon";
import AppointmentModel from "../AppointmentModel";

describe("instantiation", () => {
  it("should throw error if no `reasonForVisit` provided in instantiation", () => {
    expect(
      () =>
        new AppointmentModel({
          date: "2012-10-03",
          time: "23:00",
        })
    ).toThrowError(/reasonForVisit.*is required/);
  });

  it("should throw error if no `date` & `time` nor `datetime` provided in instantiation", () => {
    expect(
      () =>
        new AppointmentModel({
          reasonForVisit: "Follow up",
        })
    ).toThrowError(/date.*time.*must be provided/);
  });

  it("should throw error if only `date` or only `time` provided in instantiation", () => {
    expect(
      () =>
        new AppointmentModel({
          reasonForVisit: "Follow up",
          date: "2012-10-03",
        })
    ).toThrowError(/date.*time.*must be provided/);

    expect(
      () =>
        new AppointmentModel({
          reasonForVisit: "Follow up",
          time: "23:00",
        })
    ).toThrowError(/date.*time.*must be provided/);
  });

  it("should throw no error if only `datetime` provided", () => {
    expect(() => {
      new AppointmentModel({
        reasonForVisit: "Follow up",
        datetime: new Date().toISOString(),
      });
    }).not.toThrowError();
  });

  it("should give same datetime with different instantiation methods", () => {
    const a1 = new AppointmentModel({
      reasonForVisit: "Follow up",
      date: "2000-01-01",
      time: "02:00",
    });

    const a2 = new AppointmentModel({
      reasonForVisit: "Follow up",
      datetime: new Date(2000, 0, 1, 2, 0).toISOString(),
    });

    expect(a1.datetime).toEqual(a2.datetime);
  });
});

describe("test `fromSnapshot()` static method", () => {
  it("should produce correct array of appointments[]", () => {
    const datetime = DateTime.now().toISO();

    const snapshot = {
      1: {
        reasonForVisit: "follow up",
        datetime,
        status: "pending",
      },
      2: {
        reasonForVisit: "liposuction",
        datetime,
        status: "confirmed",
      },
    };

    expect(AppointmentModel.fromSnapshot(snapshot)).toHaveLength(2);
    expect(AppointmentModel.fromSnapshot(snapshot)[0]).toBeInstanceOf(
      AppointmentModel
    );
    expect(AppointmentModel.fromSnapshot(snapshot)[0].toObject()).toMatchObject(
      {
        id: "1",
        reasonForVisit: "follow up",
        datetime,
        status: "pending",
      }
    );
  });
});

describe("test `toObject()` method", () => {
  it("correctly produce saveable object", () => {
    const a = new AppointmentModel({
      reasonForVisit: "Follow up",
      date: "2000-01-01",
      time: "02:00",
    });

    const id = Date.now();
    a.id = id;

    expect(a.toObject()).toEqual({
      id: id,
      reasonForVisit: "Follow up",
      datetime: DateTime.fromJSDate(new Date(2000, 0, 1, 2)).toISO(),
      status: "pending",
    });
  });
});

describe("test `destructDateTime()` method", () => {
  it("should properly format datetime", () => {
    const a = new AppointmentModel({
      reasonForVisit: "Follow up",
      date: "2000-01-01",
      time: "02:00",
    });

    expect(a.dayOfMonth).toMatch(/^1 jan$/i);
    expect(a.dayOfWeek).toMatch(/^saturday$/i);
    expect(a.time).toMatch(/^02:00 AM$/i);
    expect(a.relativeDate).toMatch(/years ago/i);
  });
});

describe("test `isMissed()` method", () => {
  it("should correctly identify missed dates", () => {
    const a1 = new AppointmentModel({
      reasonForVisit: "Follow up",
      date: "2000-01-01",
      time: "02:00",
    });

    const a2 = new AppointmentModel({
      reasonForVisit: "Follow up",
      date: "2100-01-01",
      time: "02:00",
    });

    expect(a1.isMissed()).toBe(true);
    expect(a2.isMissed()).toBe(false);
  });
});
