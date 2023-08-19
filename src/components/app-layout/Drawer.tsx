

export const Drawer = () => {
    return (
        <div slot="start" class="drawer-start oj-sm-margin demo-drawer oj-bg-neutral-170 oj-color-invert">
            <oj-navigation-list>
                <ul>
                    <li id="one"><a href="#">Dashboard</a></li>
                    <li><a href="#">Product Management</a></li>
                    <li><a href="#">Reports</a></li>
                    <li><a href="#">Admin Panel</a></li>
                </ul>
            </oj-navigation-list>
        </div>
    )
}