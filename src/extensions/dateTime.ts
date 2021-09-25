import moment from 'moment'
import 'moment/locale/vi'

export const getTimeDuration = (time: any) => {
  return moment(time).fromNow()
}
