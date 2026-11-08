const { spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const os = require('os')

const isWin = os.platform() === 'win32'
const target = (process.argv[2] || 'apk').toLowerCase()

const taskMap = {
  apk: 'assembleRelease',
  aab: 'bundleRelease',
  bundle: 'bundleRelease',
  debug: 'assembleDebug',
}

const gradleTask = taskMap[target] || 'assembleRelease'
const androidDir = path.resolve(__dirname, '..', 'android')
const rootDir = path.resolve(__dirname, '..')
const gradleCmd = isWin ? 'gradlew.bat' : './gradlew'

console.log(`[GymApp Build] Target OS: Android | Task: ${gradleTask} | Host OS: ${os.platform()}`)

if (!fs.existsSync(androidDir)) {
  console.error(`[GymApp Build] Error: android directory not found at ${androidDir}`)
  process.exit(1)
}

// On Unix/macOS, ensure gradlew has execute permissions
if (!isWin) {
  try {
    fs.chmodSync(path.join(androidDir, 'gradlew'), 0o755)
  } catch (err) {
    // Ignore if permission change is not permitted
  }
}

const result = spawnSync(gradleCmd, [gradleTask, '--no-daemon'], {
  cwd: androidDir,
  stdio: 'inherit',
  shell: true,
})

if (result.status !== 0) {
  console.error(`[GymApp Build] Android build failed with exit code ${result.status}`)
  process.exit(result.status || 1)
}

// When building release APK, copy to root GymApp.apk for easy access
if (gradleTask === 'assembleRelease') {
  const builtApkPath = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk')
  const rootApkPath = path.join(rootDir, 'GymApp.apk')
  if (fs.existsSync(builtApkPath)) {
    try {
      fs.copyFileSync(builtApkPath, rootApkPath)
      const stats = fs.statSync(rootApkPath)
      const sizeMb = (stats.size / (1024 * 1024)).toFixed(1)
      console.log(`[GymApp Build] SUCCESS: Copied release APK to root: ${rootApkPath} (${sizeMb} MB)`)
    } catch (err) {
      console.warn(`[GymApp Build] Notice: Could not copy APK to root: ${err.message}`)
    }
  }
} else if (gradleTask === 'bundleRelease') {
  const builtAabPath = path.join(androidDir, 'app', 'build', 'outputs', 'bundle', 'release', 'app-release.aab')
  if (fs.existsSync(builtAabPath)) {
    const stats = fs.statSync(builtAabPath)
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(1)
    console.log(`[GymApp Build] SUCCESS: Release AAB bundle created at: ${builtAabPath} (${sizeMb} MB)`)
  }
}

console.log(`[GymApp Build] Build completed successfully.`)

