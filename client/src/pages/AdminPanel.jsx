import React, { useState, useEffect } from 'react';
import API from '../api/api';
import MenuItemModal from '../components/MenuItemModal';
import ZoneModal from '../components/ZoneModal';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
   const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [zone, setZone] = useState([]);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [zoneModalOpen, setZoneModalOpen] = useState(false);
  const [editMenuItem, setEditMenuItem] = useState(null);
  const [editZoneItem, setEditZoneItem] = useState(null);

  const loadMenu = async () => {
    try {
      const res = await API.get('/menu');
      setMenu(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadZone = async () => {
    try {
      const res = await API.get('/zones');
      setZone(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMenu();
    loadZone();
  }, []);

  const handleAddMenu = () => {
    setEditMenuItem(null);
    setMenuModalOpen(true);
  };

  const handleAddZone = () => {
    setEditZoneItem(null);
    setZoneModalOpen(true);
  };

  const handleEditMenu = (item) => {
    setEditMenuItem(item);
    setMenuModalOpen(true);
  };

  const handleEditZone = (item) => {
    setEditZoneItem(item);
    setZoneModalOpen(true);
  };

  const handleDeleteMenu = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      await API.delete(`/admin/menu/${id}`);
      loadMenu();
    } catch (err) {
      console.error(err);
      alert('Failed to delete menu item');
    }
  };

  const handleDeleteZone = async (id) => {
    if (!window.confirm('Are you sure you want to delete this zone?')) return;
    try {
      await API.delete(`/admin/zones/${id}`);
      loadZone();
    } catch (err) {
      console.error(err);
      alert('Failed to delete zone');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
    <Navbar onLogout={handleLogout} />
      <div className="container py-4">
        <h2 className="text-center fw-bold mb-4">🛠️ Admin Panel</h2>

        {/* Add Buttons */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          <button className="btn btn-primary" onClick={handleAddMenu}>
            ➕ Add Menu
          </button>
          <button className="btn btn-success" onClick={handleAddZone}>
            ➕ Add Zone
          </button>
        </div>

        {/* Weekly Menu Section */}
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <h5 className="card-title mb-3">🍽️ Weekly Menu</h5>
            {menu.length === 0 ? (
              <p className="text-muted">No menu items available.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Day</th>
                      <th>Lunch</th>
                      <th>Dinner</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menu.map((item, idx) => {
                      const lunch = item.meals?.find(m => m.category === 'lunch') || {};
                      const dinner = item.meals?.find(m => m.category === 'dinner') || {};

                      return (
                        <tr key={idx}>
                          <td><strong>{item.day}</strong></td>
                          <td>
                            {lunch.name || '-'}<br />
                            ₹{lunch.price || '-'} ({lunch.type || '-'})
                          </td>
                          <td>
                            {dinner.name || '-'}<br />
                            ₹{dinner.price || '-'} ({dinner.type || '-'})
                          </td>
                          <td>
                            <small>{lunch.description || ''}</small><br />
                            <small>{dinner.description || ''}</small>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-warning" onClick={() => handleEditMenu(item)}>Edit</button>
                              <button className="btn btn-sm btn-danger" onClick={() => handleDeleteMenu(item._id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Zones Section */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">🌍 Delivery Zones</h5>
            {zone.length === 0 ? (
              <p className="text-muted">No zones available.</p>
            ) : (
              <ul className="list-group">
                {zone.map((itm, id) => (
                  <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{itm.name}</strong><br />
                      <small>{itm.pincode.join(', ')}</small>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => handleEditZone(itm)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteZone(itm._id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Modals */}
        <MenuItemModal
          open={menuModalOpen}
          handleClose={() => setMenuModalOpen(false)}
          refreshData={loadMenu}
          editItem={editMenuItem}
        />

        <ZoneModal
          open={zoneModalOpen}
          handleClose={() => setZoneModalOpen(false)}
          refreshData={loadZone}
          editItem={editZoneItem}
        />
      </div>
    </>

  );
}
