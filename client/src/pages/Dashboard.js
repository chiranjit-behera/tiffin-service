import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Keep this only if it's already Bootstrap-based

export default function Dashboard() {
  const [menu, setMenu] = useState([]);
  const [zones, setZones] = useState([]);
  const [subs, setSubs] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      let userId = null;

      if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.id || decoded._id;
      }

      const [m, z, s] = await Promise.all([
        API.get('/menu'),
        API.get('/zones'),
        userId ? API.get(`/subscriptions/${userId}`) : Promise.resolve({ data: [] }),
      ]);

      setMenu(m.data);
      setZones(z.data);
      setSubs(s.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div className="container mt-5">
        <h2 className="fw-bold mb-4">📊 Dashboard</h2>

        {/* Menu Section */}
        <section className="mt-4">
          <h4 className="mb-3">🍽️ Weekly Menu</h4>
          <div className="row">
            {menu.map((dayItem, idx) => (
              <div className="col-md-6 mb-4" key={idx}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-bold mb-2">📅 {dayItem.day}</h5>
                    <hr />
                    <div className="row">
                      {['lunch', 'dinner'].map((mealTime) => (
                        <div className="col-6" key={mealTime}>
                          <h6 className="fw-bold mt-3">🍱 {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</h6>
                          <hr />
                          {dayItem.meals
                            .filter((meal) => meal.time === mealTime)
                            .map((meal, i) => (
                              <div className="mb-3" key={i}>
                                <strong className={meal.type === 'veg' ? 'text-success' : 'text-danger'}>
                                  {meal.type === 'veg' ? '🌱 Veg' : '🍗 Non-Veg'} - ₹{meal.price}
                                </strong>
                                <ul className="mt-2">
                                  {meal.items.map((dish, dIdx) => (
                                    <li key={dIdx}>
                                      <small>{dish.name} - <em>{dish.description}</em></small>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zones Section */}
        <section className="mt-5">
          <h4 className="mb-3">🚚 Delivery Zones</h4>
          <div className="card p-3 shadow-sm">
            {zones.map((zone, idx) => (
              <p key={idx} className="mb-2">
                📍 <strong>{zone.name}</strong> - {zone.pincode.join(', ')}
              </p>
            ))}
          </div>
        </section>

        {/* Subscriptions Section */}
        <section className="mt-5 mb-5">
          <h4 className="mb-3">📦 My Subscriptions</h4>
          <div className="card p-3 shadow-sm">
            {subs.length === 0 ? (
              <p>No active subscriptions.</p>
            ) : (
              subs.map((s, idx) => (
                <div key={idx} className="mb-2">
                  🗓️ <strong>{s.plan}</strong> plan - <strong>{s.deliveryZone}</strong><br />
                  Starts: {new Date(s.startDate).toLocaleDateString()}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}
