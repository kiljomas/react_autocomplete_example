let DEFAULT_PROFILE = { recentSelections: [] };
let CACHED_PROFILE = undefined;

async function fetchProfile() {
  // a service call would go here to fetch the user's profile from the db.
  // for the purposes of this example, just return the default profile.
  return Promise.resolve(DEFAULT_PROFILE);
}

async function getProfile(useCache) {
  if (useCache && CACHED_PROFILE) {
    return CACHED_PROFILE;
  }

  const profile = await fetchProfile();
  if (!profile) {
    updateProfile(DEFAULT_PROFILE);
    return DEFAULT_PROFILE;
  }
  CACHED_PROFILE = DEFAULT_PROFILE;
  return DEFAULT_PROFILE;
}

async function updateProfile(profile) {
  // a service call would go here to update the user's profile.

  CACHED_PROFILE = profile;
  return Promise.resolve();
}

export { getProfile, updateProfile };
