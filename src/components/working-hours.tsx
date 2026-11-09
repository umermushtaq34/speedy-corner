import type { WorkingHoursGroup } from "@/constants/locations";

export function WorkingHours({
  groups,
}: {
  groups: readonly WorkingHoursGroup[];
}) {
  return (
    <div className="not-prose space-y-4 text-sm leading-6 text-theme-muted">
      {groups.map((group, index) => (
        <div key={group.label ?? index}>
          {group.label && (
            <p className="mb-1 font-semibold text-theme-ink">{group.label}</p>
          )}
          <dl className="space-y-2">
            {group.schedule.map(({ days, hours }) => (
              <div key={days}>
                <dt className="font-medium">{days}</dt>
                <dd className="tabular-nums">{hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
