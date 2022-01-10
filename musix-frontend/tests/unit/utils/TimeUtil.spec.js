import TimeUtil from '../../../src/utils/TimeUtil.js'

test('Get time difference', () => {
    const seconds = new Date().getTime() - 59000
    const minutes = new Date().getTime() - 3599000
    const hours = new Date().getTime() - 86399000
    const days = new Date().getTime() - 604799000
    
    expect(TimeUtil.getTimeDifference(seconds)).toContain('Seconds Ago')
    expect(TimeUtil.getTimeDifference(minutes)).toContain('Minutes Ago')
    expect(TimeUtil.getTimeDifference(hours)).toContain('Hours Ago')
    expect(TimeUtil.getTimeDifference(days)).toContain('Days Ago')
})