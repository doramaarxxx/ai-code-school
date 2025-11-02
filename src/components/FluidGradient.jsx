import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const FluidGradient = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    
    const container = mountRef.current
    if (!container) return

    const updateSize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      
      // Orthographic camera doesn't need aspect update, but we can adjust if needed
    }
    
    updateSize()
    container.appendChild(renderer.domElement)

    // Fragment shader - Liquid Gradient with wave distortion (inspired by example)
    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      
      // Simple noise function for wave-like pattern
      float noise(vec2 p) {
        return sin(p.x) * sin(p.y);
      }
      
      // Smooth noise with multiple octaves
      float smoothNoise(vec2 p) {
        float n = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for (int i = 0; i < 4; i++) {
          n += noise(p * frequency + time * (0.1 + float(i) * 0.05)) * amplitude;
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        
        return n * 0.5 + 0.5;
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        
        // Slow down the time for smoother animation
        float t = time * 0.2;
        
        // Wave distortion - UV coordinates are warped using sin/cos waves
        // This creates the liquid/wavy effect
        uv.x += 0.15 * sin(uv.y * 4.0 + t * 0.5);
        uv.y += 0.15 * cos(uv.x * 3.0 + t * 0.3);
        
        // Additional layer of distortion for more complexity
        uv.x += 0.1 * sin(uv.y * 6.0 + t * 0.7);
        uv.y += 0.1 * cos(uv.x * 5.0 + t * 0.4);
        
        // Apply noise to create fluid-like pattern
        float n = smoothNoise(uv * 5.0 + vec2(t * 0.2, t * 0.15));
        
        // Create multiple noise layers with different scales
        float n1 = smoothNoise(uv * 3.0 + vec2(t * 0.1, t * 0.08));
        float n2 = smoothNoise(uv * 7.0 + vec2(t * 0.15, t * -0.12));
        float n3 = smoothNoise(uv * 2.0 + vec2(t * -0.08, t * 0.1));
        
        // Combine noise layers
        float combined = (n * 0.4 + n1 * 0.3 + n2 * 0.2 + n3 * 0.1);
        
        // Color palette - Dark Purple tones
        vec3 color1 = vec3(0.3, 0.15, 0.5);  // Dark purple-blue
        vec3 color2 = vec3(0.4, 0.2, 0.6);   // Deep purple
        vec3 color3 = vec3(0.5, 0.25, 0.7);  // Rich purple
        vec3 color4 = vec3(0.35, 0.15, 0.55); // Dark violet
        
        // Mix colors based on noise values - creates smooth gradient transitions
        vec3 final = mix(color1, color2, combined);
        final = mix(final, color3, n1 * 0.6 + 0.2);
        final = mix(final, color4, n2 * 0.4);
        final = mix(final, color1, n3 * 0.3);
        
        // Add subtle brightness variation for depth (slightly darker)
        final *= 0.65 + combined * 0.45;
        
        gl_FragColor = vec4(final, 1.0);
      }
    `

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
    }

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let animationId
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      uniforms.time.value = clock.getElapsedTime()
      uniforms.resolution.value.set(container.clientWidth, container.clientHeight)
      
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      updateSize()
      uniforms.resolution.value.set(container.clientWidth, container.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      material.dispose()
      geometry.dispose()
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
}

export default FluidGradient
