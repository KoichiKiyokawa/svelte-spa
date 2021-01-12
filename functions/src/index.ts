import * as glob from 'glob'
import * as ModuleAlias from 'module-alias'

ModuleAlias.addAliases({
  '@': __dirname,
})

glob.sync('./src/**/*.{oncall,pubsub}.ts').forEach((path: string) => {
  const match = path.match(/.*\/(.+).(oncall|pubsub).ts/)
  if (match == null) return

  const [, name] = match // e.g. ファイル名が`foo.oncall.ts`であれば、nameにはfooが入る
  const libPath = path.replace('src/', '').replace('.ts', '') // e.g. パスが`./src/foo.oncall.ts`であれば、`./foo.oncall`
  const functionName = process.env.K_SERVICE
  if (functionName == null || functionName === name) exports[name] = require(libPath)[name]
})
