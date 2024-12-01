import CurrentPlan from "@/components/CurrentPlan"
import ProfileMenus from "@/components/ProfileMenus"

const Profile = () => {

  return (
    <div className="grid grid-cols-5 gap-3">
      <ProfileMenus className="col-span-1" />
      <CurrentPlan className="col-span-auto flex justify-center" />
    </div>
  )
}

export default Profile