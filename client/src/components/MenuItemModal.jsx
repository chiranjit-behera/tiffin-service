import React, { useEffect, useState } from 'react';
import API from '../api/api';

const mealTypes = ['veg', 'non-veg'];

export default function MenuItemModal({ open, handleClose, refreshData, editItem }) {
  const [formData, setFormData] = useState({
    day: '',
    name: '',
    price: '',
    type: '',
    description: ''
  });

  useEffect(() => {
    if (editItem) {
      const meal = editItem?.meals?.[0] || {};
      setFormData({
        day: editItem.day || '',
        name: meal.name || '',
        price: meal.price || '',
        type: meal.type || '',
        description: meal.description || ''
      });
    } else {
      setFormData({
        day: '',
        name: '',
        price: '',
        type: '',
        description: ''
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const mealData = {
        day: formData.day,
        meals: [{
          name: formData.name,
          price: formData.price,
          type: formData.type,
          description: formData.description
        }]
      };

      if (editItem && editItem._id) {
        await API.put(`/admin/menu/${editItem._id}`, mealData);
      } else {
        await API.post('/admin/menu', mealData);
      }

      refreshData();
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save menu item');
    }
  };

  return (
    <div className={`modal fade ${open ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editItem ? 'Edit' : 'Add'} Menu Item</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Day</label>
              <input
                type="text"
                className="form-control"
                name="day"
                value={formData.day}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Meal Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                {mealTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editItem ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
