export const setContext =  async (req: any) => {
	return { ...req,  user: { profile: "ADMIN" } };
}