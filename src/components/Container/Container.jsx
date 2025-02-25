export default function Container({ children }) {
    return (
        <div className="px-4 mx-auto md:w-[750px] lg:w-[970px] xl:w-[1170px]">
            {children}
        </div>
    );
}