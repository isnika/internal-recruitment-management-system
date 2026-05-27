import { jobApi } from "../service/jobApi";
import { skillApi } from "../service/skillApi";
import { experienceLevelApi } from "../service/experienceLevelApi";

export interface HomeMetadata {
  categories: { id: number; name: string }[];
  skills: Skill[];
  experienceLevels: ExperienceLevel[];
}

export const useHomeMetadata = () => {
  const [metadata, setMetadata] = useState<HomeMetadata | null>(null);
  const [isMetaLoading, setIsMetaLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMeta = async () => {
      try {
        setIsMetaLoading(true);

        const [jobs, skills, experienceLevels] = await Promise.all([
          jobApi.getAll(), // 👈 lấy luôn category từ đây
          skillApi.getAll(),
          experienceLevelApi.getAll(),
        ]);

        // extract unique categories
        const categories = Array.from(
          new Map(
            jobs.map(job => [job.category.id, job.category])
          ).values()
        );

        setMetadata({
          categories,
          skills,
          experienceLevels,
        });
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Không thể tải metadata");
      } finally {
        setIsMetaLoading(false);
      }
    };

    getMeta();
  }, []);

  return { metadata, isMetaLoading, error };
};