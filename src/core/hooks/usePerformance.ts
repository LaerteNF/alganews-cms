
import { MetricService } from "laerte_fernandes-sdk";
import { useCallback, useState } from "react";
import { ChartProps } from "../../app/components/Chart/Chart";
import transformEditorMonthlyEaningsIntoChartJs from "../utils/transformEditorMonthlyEarningsIntoChartJS";

export default function usePerformance() {
  const [performance, setPerformance] = useState<ChartProps["data"]>();

  const fetchPerformance = useCallback(() => {
    MetricService.getEditorMonthlyEarnings()
      .then(transformEditorMonthlyEaningsIntoChartJs)
      .then(setPerformance);
  }, []);

  return {
    performance,
    fetchPerformance,
  };
}