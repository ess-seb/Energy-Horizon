interface ThemeColors {
  primary: string;
  secondaryText: string;
  cardBackground: string;
}

export function readThemeColors(root: HTMLElement | Document = document): ThemeColors {
  const target =
    root instanceof Document ? root.documentElement : (root as HTMLElement);
  const styles = getComputedStyle(target);

  const get = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    primary: get("--primary-color", "#03a9f4"),
    secondaryText: get("--secondary-text-color", "#9e9e9e"),
    cardBackground: get("--ha-card-background", "#1e1e1e")
  };
}

