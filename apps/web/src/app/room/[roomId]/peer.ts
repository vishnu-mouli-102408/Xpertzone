class PeerService {
  private peer: RTCPeerConnection | null = null;

  constructor() {
    this.peer ??= new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
  }

  async getAnswer(
    offer: RTCSessionDescriptionInit
  ): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
    return undefined;
  }

  async setLocalDescription(ans: RTCSessionDescriptionInit): Promise<void> {
    if (this.peer) {
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
    }
  }

  async setRemoteDescription(offer: RTCSessionDescriptionInit): Promise<void> {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    }
  }

  /**
   * Returns the current RTCPeerConnection instance or null, wrapped in a Promise.
   * This is useful for async/await usage and to match the declared return type.
   */
  getPeer(): RTCPeerConnection | null {
    return this.peer;
  }

  async getOffer(): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
    return undefined;
  }

  async addIceCandidate(
    candidate: RTCIceCandidate | RTCIceCandidateInit
  ): Promise<void> {
    if (this.peer) {
      try {
        // If it's already an RTCIceCandidate, use it directly
        if (candidate instanceof RTCIceCandidate) {
          await this.peer.addIceCandidate(candidate);
        }
        // If it's a candidate object, create a new RTCIceCandidate
        else if (candidate.candidate) {
          const iceCandidate = new RTCIceCandidate({
            candidate: candidate.candidate,
            sdpMid: candidate.sdpMid ?? "0",
            sdpMLineIndex: candidate.sdpMLineIndex ?? 0,
          });
          await this.peer.addIceCandidate(iceCandidate);
        }
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    }
  }
}

export default new PeerService();
