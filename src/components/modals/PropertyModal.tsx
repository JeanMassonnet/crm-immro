{/* Previous imports remain the same */}

export default function PropertyModal({ isOpen, onClose, property }: PropertyModalProps) {
  const { register, handleSubmit, reset } = useForm<PropertyFormData>();
  const { addProperty, updateProperty } = usePropertyStore();
  const { clients } = useClientStore();
  const advisors = clients.filter((client) => client.types.seller);

  // Rest of the component remains the same, just update the label
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* ... other JSX ... */}
      <select
        {...register('sellerId', { required: true })}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
      >
        <option value="">Sélectionner un conseiller</option>
        {advisors.map((advisor) => (
          <option key={advisor.id} value={advisor.id}>
            {advisor.firstName} {advisor.lastName}
          </option>
        ))}
      </select>
      {/* ... rest of JSX ... */}
    </div>
  );
}