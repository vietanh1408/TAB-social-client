import moment from 'moment'

export const getTimeDuration = (time: any) => {
  return moment(time).fromNow()
}
