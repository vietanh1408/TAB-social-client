import moment from 'moment'
import 'moment/locale/vi'

export const getTimeDuration = (time: Date | undefined) => {
  return moment(time).fromNow()
}
