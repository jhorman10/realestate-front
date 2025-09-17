import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../../components/forms/PropertyForm';

const CreatePropertyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/properties');
  };

  const handleCancel = () => {
    navigate('/properties');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default CreatePropertyPage;