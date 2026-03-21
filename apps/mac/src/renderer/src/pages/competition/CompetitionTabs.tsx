import { TabLayout } from "@/app/layouts/tab";
import { useRival } from "@/shared/lib";
import { RivalsManagementDialog } from "@/shared/ui";

export const CompetitionTabs = () => {
  const rival = useRival();
  const hasRivals = (rival.rivalsData?.myRivals.length ?? 0) > 0;

  return (
    <>
      <TabLayout
        tabs={[
          { name: "나와의 경쟁", url: "/competition" },
          {
            name: "라이벌과의 경쟁",
            url: "/competition/rival",
            onSelect: () => {
              if (hasRivals) {
                return true;
              }
              rival.handleOpen();
              return false;
            },
          },
        ]}
      />

      {rival.modalOpen && (
        <RivalsManagementDialog
          isOpen={rival.modalOpen}
          onClose={rival.handleClose}
          rival={rival}
        />
      )}
    </>
  );
};
