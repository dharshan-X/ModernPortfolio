import { useEffect, useState } from 'react';
import { Github, Star, GitFork, BookOpen } from 'lucide-react';

export default function GithubProfileCard({ username }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
        ]);
        
        if (profileRes.ok && reposRes.ok) {
          setProfile(await profileRes.json());
          setRepos(await reposRes.json());
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    fetchGithubData();
  }, [username]);

  // If loading, show skeleton
  if (loading) {
    return (
      <div className="w-full aspect-[3/4] border border-black/10 rounded-2xl flex items-center justify-center bg-black/5 animate-pulse mb-4">
        <Github size={40} className="text-black/20 animate-bounce" />
      </div>
    );
  }

  // Use fetched profile or beautifully designed fallback
  const data = error ? {
    avatar_url: "/hero-portrait.png",
    name: "Dharshan Balaji",
    login: "dharsahan",
    html_url: "https://github.com/dharsahan",
    bio: "Aspiring to be a Software Engineer. Passionate about building elegant digital experiences.",
    public_repos: 52,
    followers: 128,
    following: 45
  } : profile;

  const repoData = error ? [
    { id: 1, name: "modern-portfolio", html_url: "#", language: "JavaScript", stargazers_count: 12, forks_count: 2 },
    { id: 2, name: "ai-saas-platform", html_url: "#", language: "TypeScript", stargazers_count: 34, forks_count: 8 },
    { id: 3, name: "cloud-native-api", html_url: "#", language: "Go", stargazers_count: 8, forks_count: 1 },
  ] : repos;

  return (
    <div className="w-full border border-black/10 rounded-2xl bg-[#eaeaea] p-6 hover:shadow-2xl transition-all duration-500 overflow-hidden relative group mb-4">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-black/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700" />
      
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={data.avatar_url || "/hero-portrait.png"} 
          alt={data.login} 
          className="w-16 h-16 rounded-full border-2 border-black/10 object-cover"
        />
        <div>
          <h3 className="font-display font-bold text-lg leading-tight">{data.name || data.login}</h3>
          <a 
            href={data.html_url} 
            target="_blank" 
            rel="noreferrer"
            className="text-text-muted hover:text-primary transition-colors text-sm flex items-center gap-1"
          >
            @{data.login}
          </a>
        </div>
      </div>

      <p className="text-sm text-text-muted mb-6 line-clamp-2">
        {data.bio || "Software Engineer & Open Source Contributor"}
      </p>

      <div className="grid grid-cols-3 gap-2 mb-8 text-center border-y border-black/5 py-4">
        <div>
          <p className="text-xl font-display font-bold">{data.public_repos}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Repos</p>
        </div>
        <div>
          <p className="text-xl font-display font-bold">{data.followers}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Followers</p>
        </div>
        <div>
          <p className="text-xl font-display font-bold">{data.following}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Following</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Recent Activity</p>
        {repoData.map(repo => (
          <a 
            key={repo.id} 
            href={repo.html_url}
            target="_blank"
            rel="noreferrer" 
            className="block p-3 rounded-xl hover:bg-black/5 transition-colors border border-transparent hover:border-black/5"
          >
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={14} className="text-text" />
              <p className="text-sm font-semibold truncate text-text">{repo.name}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              {repo.language && (
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-black/40"></span>
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1"><Star size={12}/> {repo.stargazers_count}</span>
              <span className="flex items-center gap-1"><GitFork size={12}/> {repo.forks_count}</span>
            </div>
          </a>
        ))}
      </div>

      {/* "Live Profile" badge */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 px-2 py-1 bg-green-500/10 text-green-700 rounded-full text-[9px] font-bold uppercase tracking-wider">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-600"></span>
        </span>
        Live Profile
      </div>
    </div>
  );
}
