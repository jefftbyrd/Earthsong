export const normalizeSnapshotFormat = (data: any) => {
  if (!data) return null;

  // Helper function to format coordinates consistently
  const formatCoordinates = (lat: number | string, lng: number | string) => {
    return {
      lat: Number(lat).toFixed(3),
      lng: Number(lng).toFixed(3),
    };
  };

  // If data is already an array, it's in the new format
  if (Array.isArray(data)) {
    return data;
  }

  // Check if this is the old format (object with sounds array)
  if (data.sounds && Array.isArray(data.sounds)) {
    // Extract coordinates - first try direct pin on soundsColor
    let pin = null;

    // Case 1: Direct pin on data
    if (data.pin?.lat !== undefined && data.pin?.lng !== undefined) {
      pin = formatCoordinates(data.pin.lat, data.pin.lng);
    }
    // Case 2: Pin on first sound
    else if (
      data.sounds[0]?.pin?.lat !== undefined &&
      data.sounds[0]?.pin?.lng !== undefined
    ) {
      pin = formatCoordinates(data.sounds[0].pin.lat, data.sounds[0].pin.lng);
    }
    // Case 3: Geotag on first sound
    else if (data.sounds[0]?.geotag) {
      const geotagSplit = data.sounds[0].geotag.split(' ');
      if (geotagSplit && geotagSplit.length >= 2) {
        pin = formatCoordinates(geotagSplit[0], geotagSplit[1]);
      }
    }

    // Create object in new format while preserving all original properties
    const normalizedData = {
      ...data, // This spreads all original properties
      pin: pin,
      location: data.location || data.sounds[0]?.location || data.title || '',
      // Set createdAt to 'unknown' if it's missing
      createdAt: data.createdAt || 'unknown',
      // Ensure userId exists
      userId: data.userId || 'unknown',
      // sounds property is already in data, no need to redefine
    };

    return normalizedData;
  }

  // If it's neither an array nor has a sounds property, return as is
  return data;
};
