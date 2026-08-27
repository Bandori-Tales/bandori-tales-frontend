import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

const JapanTZ = 'Asia/Tokyo';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault(JapanTZ);

export { JapanTZ, dayjs as JpDate };
