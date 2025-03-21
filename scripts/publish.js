/**
 * 用于发布时备份并移除 devDependencies，发布后恢复 package.json
 */

const fs = require('fs')
const path = require('path')

const packageJsonPath = path.resolve(__dirname, '../package.json')
const backupJsonPath = path.resolve(__dirname, '../package.json.bak')

// 如果是 prepublishOnly 阶段，备份并移除 devDependencies
if (process.env.npm_lifecycle_event === 'prepublishOnly') {
  const packageJson = require(packageJsonPath)
  fs.writeFileSync(backupJsonPath, JSON.stringify(packageJson, null, 2))
  delete packageJson.devDependencies
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

// 如果是 postpublish 阶段，恢复 package.json
if (process.env.npm_lifecycle_event === 'postpublish') {
  if (fs.existsSync(backupJsonPath)) {
    fs.writeFileSync(packageJsonPath, fs.readFileSync(backupJsonPath, 'utf8'))
    fs.unlinkSync(backupJsonPath)
  }
}
