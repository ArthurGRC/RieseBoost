import { Avatar, AvatarFallback, AvatarImage } from '../Ui/avatar';

const TopBar = () => {
  return (
    <div className="hidden w-full sm:flex justify-end items-center pr-4 py-4">
      <div className="flex gap-2">
        <div className="flex flex-col gap-1 justify-center items-end">
          <p className="text-xs text-rbGrey">arthurriesecorrea@gmail.com</p>
          <h1 className="text-black text-sm font-bold">Arthur Gabriel</h1>
        </div>
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/ArthurGRC" />
          <AvatarFallback>BR</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopBar;
