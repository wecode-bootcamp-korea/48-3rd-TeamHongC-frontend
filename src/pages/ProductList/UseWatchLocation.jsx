import { useState, useEffect, useRef } from 'react';

const UseWatchLocation = (options = {}) => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();
  const locationWatchId = useRef(null);

  const handleSuccess = pos => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = error => {
    setError(error.message);
  };

  const cancelLocationWatch = () => {
    const { geolocation } = navigator;

    if (locationWatchId.current && geolocation) {
      geolocation.clearWatch(locationWatchId.current);
    }
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    locationWatchId.current = geolocation.watchPosition(
      handleSuccess,
      handleError,
      options,
    );

    return cancelLocationWatch;
  }, [options]);

  return { location, cancelLocationWatch, error };
};

export default UseWatchLocation;
