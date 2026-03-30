import css from "./Layout.module.css";

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <>
      <div className={css.container}>
        <div className={css.sidebar}>{sidebar}</div>
        <div className={css.notesWrapper}>{children}</div>
      </div>
    </>
  );
}
export default FilterLayout;
