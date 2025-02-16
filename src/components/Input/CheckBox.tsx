function CheckBoxInput({ id, name }: { id: string; name: string }) {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={name}
        className="h-6 w-6 text-rbLightCoral border-gray-300 rounded focus:outline-none focus:ring-0"
      />
    </div>
  );
}

export default CheckBoxInput;
