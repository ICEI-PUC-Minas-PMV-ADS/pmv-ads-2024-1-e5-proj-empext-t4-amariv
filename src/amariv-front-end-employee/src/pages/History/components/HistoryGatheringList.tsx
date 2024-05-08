import { HistoryGathering } from "../../../models/HistoryGathering";
import { HistoryGatheringItem } from "./HistoryGatheringItem";

/**
 * HistoryGatheringListProps
 */

export type HistoryGatheringListProps = {
  gatherings: HistoryGathering[],
};

/**
 * HistoryGatheringList
 */

export function HistoryGatheringList({ gatherings }: HistoryGatheringListProps) {
  return (
    <div className="w-full">
      {gatherings.map((gathering) => <HistoryGatheringItem key={gathering.id} gathering={gathering} />)}
    </div>
  );
}