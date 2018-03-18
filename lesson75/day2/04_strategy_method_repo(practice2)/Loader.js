const Loader = class {
  constructor() {
    this._repositories = new Map;
  }
  addRepo(repoKey, id, repoName) {
    if (!repoKey) throw 'invalid repoKey';
    if (!id) throw 'invalid id';
    if (!repoName) throw 'invalid repoName';

    const router = new Map;
    const git = new Github(id, repoName);
    this._repositories.set(repoKey, [git, router]);
  }
  addRouter(repoKey, ext, f, ...arg) {
    if (!this._repositories.has(repoKey)) throw 'invalid repoKey';
    const router = this._repositories.get(repoKey)[1];
    ext.split(',').forEach(v => router.set(v, [f, ...arg]));
  }
  load(repoKey, v) {
    if (!this._repositories.has(repoKey)) throw 'invalid repoKey';
    const repo = this._repositories.get(repoKey);
    const ext = v.split('.').pop();
    const router = repo[1];
    if (!router.has(ext)) return;
    const git = repo[0];
    git.setParser(...router.get(ext));
    git.load(v);
  }
}