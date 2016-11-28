const exec = require('child_process').exec
const pkg = require('../package.json')
const { version, repository } = pkg
const ver = `v${version}`

exec(`cd npm && 
git init && 
git remote add origin ${repository} && 
git add . && 
git commit -anm "${ver}" &&
git checkout -b ${ver} &&
git push origin ${ver}`, (err, stdout) => {
  if (err) {
    return console.log(err)
  }

  console.log(stdout)
})
