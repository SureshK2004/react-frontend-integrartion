// components/formsDetails/fieldJobPage.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FieldJobHead from './fieldJobHead';
import CreateFormTab from './CreateFormTab';
import ViewForms from './ViewForms';
import NewFormPage from './newFormPage';

const FieldJobPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <FieldJobHead />

      <Routes>
        <Route index element={<CreateFormTab />} />
        <Route path="view" element={<ViewForms />} />
        <Route path="new" element={<NewFormPage />} />

      </Routes>
    </div>
  );
};

export default FieldJobPage;