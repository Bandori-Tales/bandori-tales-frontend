import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

const JapanTZ = 'Asia/Tokyo';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault(JapanTZ);

function japanDate(date?: string | number | Date | dayjs.Dayjs | null) {
  return dayjs(date).tz(JapanTZ);
}

export { JapanTZ, dayjs as JpDate, japanDate };
