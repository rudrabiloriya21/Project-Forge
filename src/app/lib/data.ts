
export type Difficulty = 'easy' | 'medium' | 'hard';

export type Category = 'Microcontroller' | 'Minicomputer';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  platform: string;
  difficulty: Difficulty;
  components: string[];
  instructions: string[];
  code?: string;
  imageUrl?: string;
}

export const PLATFORMS = {
  microcontrollers: [
    'Arduino UNO', 'ESP32', 'ESP32-S3', 'ESP32-C3', 'ESP32-C6', 'ESP8266', 
    'STM32', 'STM32F103', 'STM32F407', 'STM32F746', 'STM32H743', 'STM32L4',
    'RP2040', 'nRF52832', 'nRF52840', 'ATmega328P', 'PIC', 'ARM Prototype'
  ],
  minicomputers: [
    'Raspberry Pi 5', 'Raspberry Pi 4', 'Raspberry Pi 3 Model B+', 'Raspberry Pi Zero 2 W',
    'Jetson Nano', 'Jetson Orin Nano', 'Orange Pi 5', 'ODROID-N2+', 'Intel NUC', 
    'VisionFive 2', 'BeagleBone Black', 'ASUS Tinker Board 2', 'Pine A64', 'RockPro64',
    'Rock 5B', 'Rock Pi 4', 'LattePanda Delta', 'ASRock 4X4 BOX', 'Zotac ZBOX',
    'Libre Computer AML-S905X-CC', 'Khadas VIM4', 'UP Board', 'NanoPi R6S', 'Cubieboard6'
  ],
};

const generateBatch = (platform: string, category: Category, prefix: string, count: number): Project[] => {
  const topics = [
    'IoT integration', 'Real-time monitoring', 'Low-power sensing', 'Network security', 
    'Human-Machine Interface', 'Data visualization', 'Hardware acceleration', 'Edge computing', 
    'Distributed systems', 'Signal processing', 'Autonomous control', 'Cloud synchronization',
    'Mesh networking', 'Cryptographic hashing', 'Machine learning inference', 'Neural network deployment',
    'Home automation', 'Environmental logging', 'Predictive maintenance', 'Smart agriculture',
    'Remote telemetry', 'Wearable health tracking', 'Energy management', 'Industrial protocol bridging',
    'Smart City node', 'Audio processing', 'Motion tracking', 'RFID access control', 'Biometric security'
  ];
  
  const deviceTypes = [
    'Node', 'Controller', 'Server', 'System', 'Hub', 'Monitor', 'Gateway', 'Dashboard', 
    'Logger', 'Interface', 'Actuator', 'Module', 'Broadcaster', 'Receiver', 'Analyzer',
    'Optimizer', 'Synthesizer', 'Aggregator', 'Validator', 'Shield', 'Protector',
    'Engine', 'Unit', 'Console', 'Panel', 'Probe', 'Sensor Array'
  ];

  const peripherals = [
    'Sensor', 'OLED Display', 'Relay', 'Buzzer', 'Button', 'Servo', 'WiFi Module', 
    'SD Card', 'Battery Pack', 'Custom PCB', 'Stepper Motor', 'TFT Display', 
    'Bluetooth Module', 'LoRa Radio', 'GPS Module', 'Camera Module', 'Lidar Sensor',
    'Touch Panel', 'Current Monitor', 'PWM Driver', 'ADC Expander', 'I2C Hub',
    'Thermal Camera', 'Encoder', 'Joystick', 'Keypad', 'Solonoid'
  ];

  return Array.from({ length: count }).map((_, i) => {
    const difficulty: Difficulty = i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard';
    const topic = topics[i % topics.length];
    const type = deviceTypes[i % deviceTypes.length];
    
    return {
      id: `${prefix}-${i + 1}`,
      title: `${platform} Project ${i + 1}: ${topic} ${type}`,
      description: `A sophisticated ${platform} implementation focusing on ${topic.toLowerCase()}. This project demonstrates professional-grade ${category === 'Microcontroller' ? 'embedded firmware' : 'systems architecture'} techniques, specifically optimized for the ${platform} hardware footprint. Build a robust ${type.toLowerCase()} system for real-world deployment.`,
      category,
      platform,
      difficulty,
      components: [
        platform, 
        peripherals[i % peripherals.length], 
        peripherals[(i + 5) % peripherals.length],
        peripherals[(i + 11) % peripherals.length]
      ],
      instructions: [
        `Initialize the ${platform} core hardware and verify stable power supply requirements.`,
        `Interface the ${peripherals[i % peripherals.length]} using standard communication protocols (I2C/SPI).`,
        `Implement the ${topic} logic layer to process incoming telemetry data.`,
        `Configure the ${type} output parameters for real-time responsiveness.`,
        `Apply technical optimizations for ${difficulty} complexity standards.`,
        `Conduct a full systems diagnostic to ensure 99.9% uptime in the field.`
      ]
    };
  });
};

// MAPPING OVER ALL PLATFORMS
// Flagship platforms get 110 projects, others get 20
export const PROJECTS: Project[] = [
  // MICROCONTROLLERS
  ...PLATFORMS.microcontrollers.flatMap(p => {
    const isPopular = ['Arduino UNO', 'ESP32', 'ESP8266', 'STM32', 'ESP32-S3', 'ESP32-C3', 'ESP32-C6'].includes(p);
    const count = isPopular ? 110 : 20;
    const prefix = p.toLowerCase().replace(/[^a-z0-9]/g, '');
    return generateBatch(p, 'Microcontroller', prefix, count);
  }),

  // MINICOMPUTERS
  ...PLATFORMS.minicomputers.flatMap(p => {
    const isPopular = p.includes('Raspberry Pi') || p.includes('Jetson') || p.includes('Orange Pi');
    const count = isPopular ? 110 : 20;
    const prefix = p.toLowerCase().replace(/[^a-z0-9]/g, '');
    return generateBatch(p, 'Minicomputer', prefix, count);
  }),
  
  // Specific unique hard-coded projects preserved
  { 
    id: 'solar-weather-node', 
    title: 'Solar Powered Weather Node', 
    description: 'Deep sleep optimized solar logger for environmental monitoring.', 
    category: 'Microcontroller', 
    platform: 'ESP32-C3', 
    difficulty: 'medium', 
    components: ['ESP32-C3', 'Solar Panel', 'BME280', 'LiPo Battery'], 
    instructions: [
      'Measure battery voltage via ADC divider.', 
      'Configure BME280 for forced mode operation.',
      'Initialize deep sleep for 1-hour intervals.', 
      'Transmit data to ThingSpeak cloud via SSL.'
    ] 
  },
  { 
    id: 'ai-vision-hub', 
    title: 'Real-time Object Detection Hub', 
    description: 'TensorRT accelerated vision node for industrial security.', 
    category: 'Minicomputer', 
    platform: 'Jetson Orin Nano', 
    difficulty: 'hard', 
    components: ['Jetson Orin Nano', 'IMX219 Camera', 'Industrial Enclosure'], 
    instructions: [
      'Install NVIDIA JetPack 6.0 SDK.', 
      'Optimize YOLOv8 weights using TensorRT engine.', 
      'Configure CUDA stream for 60FPS inference.',
      'Setup RTSP server for remote monitoring.'
    ] 
  }
];
