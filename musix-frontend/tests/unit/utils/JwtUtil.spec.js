import JwtUtil from '../../../src/utils/JwtUtil.js'

test('Can parse jwt', () => {
    const claims = JwtUtil.parseJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNjIwMDBmZi1kYzcyLTQ5ZWUtYmY1OC1hNjlmMGViMmFhOWEiLCJzdWIiOiI3N2Y5YzQxOS1lOWYwLTRkNDgtOGQxZS01ZDBjYmVlMzY4MDEiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImZvbnR5cy5tdXNpeEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImV4cCI6MTY0MjAwMTEzNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.3JS4iaoesPkBwnM-LyQJx_-11mPRPFF3DKMMsx7X-PE')
    
    expect(claims.sub).toBe('77f9c419-e9f0-4d48-8d1e-5d0cbee36801')
    expect(claims.name).toBe('admin')
    expect(claims.email).toBe('fontys.musix@gmail.com')
    expect(claims.role).toBe('administrator')
})

test('Can check expiration', () => {
    expect(JwtUtil.checkExpiration(1641298000)).toBe(true)
    expect(JwtUtil.checkExpiration(new Date().getTime() / 1000 + 10000)).toBe(false)
})