import React, { useEffect, useState, useRef, useCallback } from 'react';
import Loading from './Loading';
import SearchBar from './SearchBar';
import { fetchLaunches } from '../api/spacex';
import MissionCard from './MissionCard';

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const observer = useRef();

  const loadLaunches = useCallback(async () => {
    setLoading(true);
    const newLaunches = await fetchLaunches(page);

    // Remove duplicates
    const uniqueLaunches = newLaunches.filter(
      (newLaunch) => !launches.some((launch) => launch.flight_number === newLaunch.flight_number)
    );

    // Combine and sort by launch_date_utc
    const combinedLaunches = [...launches, ...uniqueLaunches].sort(
      (a, b) => new Date(b.launch_date_utc) - new Date(a.launch_date_utc)
    );

    setLaunches(combinedLaunches);
    setHasMore(newLaunches.length > 0);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadLaunches();
  }, [loadLaunches]);

  const lastLaunchRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const filteredLaunches = launches.filter((launch) =>
    launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ width: '50%', height: '70vh', display: 'flex', flexDirection: 'column' }}>
      <SearchBar onSearch={handleSearch} />
      <div style={{ flex: 1, overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {filteredLaunches.map((launch, index) => {
          const isLastLaunch = filteredLaunches.length === index + 1;
          return (
            <div key={`${launch.flight_number}-${launch.launch_date_utc}`} ref={isLastLaunch ? lastLaunchRef : null}>
              <MissionCard mission={{
                name: launch.mission_name,
                date: launch.launch_date_utc,
                image: launch.links.mission_patch_small,
                articleLink: launch.links.article_link,
                videoLink: launch.links.video_link,
                details: launch.details,
                launch_success: launch.launch_success,
                upcoming: launch.upcoming
              }} />
            </div>
          );
        })}
        {loading && <Loading />}
        {!hasMore && <p>No more launches available.</p>}
      </div>
    </div>
  );
};

export default LaunchList;