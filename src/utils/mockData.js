export const recentLogs = [
  {
    id: 'log-001',
    timestamp: '2026-04-02T10:15:00Z',
    deviceType: 'MacBook Pro 16"',
    os: 'macOS',
    browser: 'Chrome',
    ipAddress: '192.168.1.105',
    location: 'San Francisco, CA, US',
    isSuspicious: false,
    status: 'success' // success, failed
  },
  {
    id: 'log-002',
    timestamp: '2026-04-02T05:32:11Z',
    deviceType: 'iPhone 15 Pro',
    os: 'iOS',
    browser: 'Safari',
    ipAddress: '172.20.10.2',
    location: 'Los Angeles, CA, US',
    isSuspicious: false,
    status: 'success'
  },
  {
    id: 'log-003',
    timestamp: '2026-04-01T23:45:00Z',
    deviceType: 'Unknown Windows Device',
    os: 'Windows 10',
    browser: 'Firefox',
    ipAddress: '45.22.11.90',
    location: 'Moscow, RU',
    isSuspicious: true,
    status: 'failed'
  },
  {
    id: 'log-004',
    timestamp: '2026-04-01T12:05:22Z',
    deviceType: 'Unknown Android Device',
    os: 'Android 13',
    browser: 'Chrome Mobile',
    ipAddress: '103.45.67.89',
    location: 'Jakarta, ID',
    isSuspicious: true,
    status: 'success'
  },
  {
    id: 'log-005',
    timestamp: '2026-03-30T09:12:33Z',
    deviceType: 'MacBook Pro 16"',
    os: 'macOS',
    browser: 'Chrome',
    ipAddress: '192.168.1.105',
    location: 'San Francisco, CA, US',
    isSuspicious: false,
    status: 'success'
  }
];

export const trustedDevices = [
  {
    id: 'dev-001',
    name: 'My Personal MacBook',
    deviceType: 'MacBook Pro 16"',
    lastActive: '2026-04-02T10:15:00Z'
  },
  {
    id: 'dev-002',
    name: 'My iPhone',
    deviceType: 'iPhone 15 Pro',
    lastActive: '2026-04-02T05:32:11Z'
  }
];

export const mockAlerts = [
  {
    id: 'alt-001',
    title: 'New Login Detected',
    message: 'A login was successful from an unrecognized device in Jakarta, ID.',
    timestamp: '2026-04-01T12:05:22Z',
    severity: 'high',
    resolved: false
  },
  {
    id: 'alt-002',
    title: 'Multiple Failed Login Attempts',
    message: '5 failed login attempts were blocked from an IP in Moscow, RU.',
    timestamp: '2026-04-01T23:50:00Z',
    severity: 'critical',
    resolved: false
  }
];

export const accountStats = {
  totalLogins: 45,
  suspiciousAttempts: 8,
  trustedDevicesCount: 2,
  riskScore: 'Medium' 
};
