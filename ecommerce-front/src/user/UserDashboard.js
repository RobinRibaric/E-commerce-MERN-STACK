import React from 'react'
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';

const UserDashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li class="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li class="list-group-item">
                        <Link className="nav-link" to="/profile/update">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li class="list-group-item">{name}</li>
                <li class="list-group-item">{email}</li>
                <li class="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
            </ul>
        </div>
    )

    const purchaseHistory = () => (
        <div class="card mb-5">
            <h3 class="card-header">Purchase History</h3>
            <ul className="list-group">
                <li class="list-group-item">history</li>
            </ul>
        </div>
    )
    return (
        <Layout title="Dashboard" description="User Dashboard" className="px-4" >

            <div class="row">
                <div class="col-3">
                    {userLinks()}
                </div>
                <div class="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard
