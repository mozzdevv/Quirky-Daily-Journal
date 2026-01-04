import numpy as np
import wave
import struct
import math
import random

def save_wav(filename, data, sample_rate=44100):
    with wave.open(filename, 'w') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(sample_rate)
        for sample in data:
            # Clip to 16-bit range
            sample = max(-32767, min(32767, int(sample * 32767)))
            f.writeframes(struct.pack('<h', sample))

def generate_glass_chime(duration=1.5, frequency=880, sample_rate=44100):
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    
    # Fundamental frequency + harmonics for glass-like sound
    # Glass has non-integer harmonics
    harmonics = [1.0, 2.76, 5.4, 8.93]
    amplitudes = [1.0, 0.4, 0.2, 0.1]
    decay_rates = [4.0, 6.0, 8.0, 10.0]
    
    signal = np.zeros_like(t)
    
    for h, amp, decay in zip(harmonics, amplitudes, decay_rates):
        # Sine wave
        wave = np.sin(2 * np.pi * frequency * h * t)
        # Exponential decay
        envelope = np.exp(-decay * t)
        signal += wave * envelope * amp
    
    # Normalize
    signal = signal / np.max(np.abs(signal)) * 0.6
    return signal

def generate_cosmic_hover(duration=0.3, base_freq=200, sample_rate=44100):
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    
    # Frequency sweep (upward)
    freq = np.linspace(base_freq, base_freq * 1.5, len(t))
    
    # Sine wave with tremolo
    signal = np.sin(2 * np.pi * freq * t)
    
    # Tremolo (amplitude modulation)
    tremolo = 0.5 * (1 + np.sin(2 * np.pi * 20 * t))
    signal *= tremolo
    
    # Envelope (Attack, Decay)
    attack_time = 0.05
    attack_samples = int(attack_time * sample_rate)
    envelope = np.ones_like(t)
    envelope[:attack_samples] = np.linspace(0, 1, attack_samples)
    envelope[attack_samples:] = np.linspace(1, 0, len(t) - attack_samples)
    
    signal *= envelope
    
    # Normalize
    signal = signal / np.max(np.abs(signal)) * 0.3
    return signal

def generate_ambient_click(duration=0.1, sample_rate=44100):
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    
    # High frequency burst
    signal = np.sin(2 * np.pi * 2000 * t) * np.exp(-50 * t)
    
    # Add some noise
    noise = np.random.normal(0, 0.1, len(t)) * np.exp(-50 * t)
    signal += noise
    
    # Normalize
    signal = signal / np.max(np.abs(signal)) * 0.2
    return signal

# Generate sounds
print("Generating sounds...")

# 1. Glass Chime (for opening modal/planting memory)
chime_data = generate_glass_chime(duration=2.0, frequency=1100) # High pitch C6 approx
save_wav('/home/ubuntu/one-year-journal/client/public/sounds/glass-chime.wav', chime_data)
print("Generated glass-chime.wav")

# 2. Cosmic Hover (for hovering over dots)
hover_data = generate_cosmic_hover(duration=0.2, base_freq=300)
save_wav('/home/ubuntu/one-year-journal/client/public/sounds/cosmic-hover.wav', hover_data)
print("Generated cosmic-hover.wav")

# 3. Soft Click (for navigation)
click_data = generate_ambient_click()
save_wav('/home/ubuntu/one-year-journal/client/public/sounds/soft-click.wav', click_data)
print("Generated soft-click.wav")

print("All sounds generated successfully.")
